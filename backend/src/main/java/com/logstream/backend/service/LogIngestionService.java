package com.logstream.backend.service;

import com.logstream.backend.model.LogRecord;
import com.logstream.backend.websocket.LiveTailHandler;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LogIngestionService {

    private final LuceneService luceneService;
    private final LiveTailHandler liveTailHandler;

    public LogIngestionService(
            LuceneService luceneService,
            LiveTailHandler liveTailHandler) {

        this.luceneService = luceneService;
        this.liveTailHandler = liveTailHandler;
    }

    /**
     * Ingest a single log.
     */
    public void ingest(LogRecord logRecord) {

        validate(logRecord);

        luceneService.indexLog(logRecord);

        broadcast(logRecord);
    }

    /**
     * Ingest a batch of logs.
     *
     * This avoids unnecessary service-level overhead
     * when processing high-volume log data.
     */
    public void ingestBatch(List<LogRecord> logRecords) {

        if (logRecords == null || logRecords.isEmpty()) {
            throw new IllegalArgumentException(
                    "Log batch cannot be empty"
            );
        }

        for (LogRecord logRecord : logRecords) {

            validate(logRecord);
        }

        luceneService.indexLogs(logRecords);

        for (LogRecord logRecord : logRecords) {

            broadcast(logRecord);
        }
    }

    /**
     * Send the accepted log to all connected Live Tail clients.
     */
    private void broadcast(LogRecord logRecord) {

        String json =
                "{"
                        + "\"timestamp\":\""
                        + escapeJson(logRecord.getTimestamp())
                        + "\","
                        + "\"service\":\""
                        + escapeJson(logRecord.getService())
                        + "\","
                        + "\"level\":\""
                        + escapeJson(logRecord.getLevel())
                        + "\","
                        + "\"message\":\""
                        + escapeJson(logRecord.getMessage())
                        + "\""
                        + "}";

        liveTailHandler.broadcast(json);
    }

    /**
     * Escape characters that could break the JSON string.
     */
    private String escapeJson(String value) {

        if (value == null) {
            return "";
        }

        return value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r");
    }

    private void validate(LogRecord logRecord) {

        if (logRecord == null) {
            throw new IllegalArgumentException(
                    "Log cannot be null"
            );
        }

        if (isBlank(logRecord.getTimestamp())) {
            throw new IllegalArgumentException(
                    "Timestamp cannot be empty"
            );
        }

        if (isBlank(logRecord.getService())) {
            throw new IllegalArgumentException(
                    "Service cannot be empty"
            );
        }

        if (isBlank(logRecord.getLevel())) {
            throw new IllegalArgumentException(
                    "Level cannot be empty"
            );
        }

        if (isBlank(logRecord.getMessage())) {
            throw new IllegalArgumentException(
                    "Message cannot be empty"
            );
        }
    }

    private boolean isBlank(String value) {

        return value == null || value.trim().isEmpty();
    }
}