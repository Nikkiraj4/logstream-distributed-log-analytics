package com.logstream.backend.service;

import com.logstream.backend.model.LogRecord;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnalyticsService {

    private final LuceneService luceneService;

    public AnalyticsService(LuceneService luceneService) {
        this.luceneService = luceneService;
    }

    public List<Map<String, Object>> getLogLevelAnalytics() {

        List<LogRecord> logs = getAllLogs();

        Map<String, Long> counts = new LinkedHashMap<>();

        for (LogRecord log : logs) {

            String level = log.getLevel();

            if (level == null || level.isBlank()) {
                continue;
            }

            counts.merge(
                    level.toUpperCase(),
                    1L,
                    Long::sum
            );
        }

        return toAnalyticsList(counts);
    }

    public List<Map<String, Object>> getServiceAnalytics() {

        List<LogRecord> logs = getAllLogs();

        Map<String, Long> counts = new LinkedHashMap<>();

        for (LogRecord log : logs) {

            String service = log.getService();

            if (service == null || service.isBlank()) {
                continue;
            }

            counts.merge(
                    service,
                    1L,
                    Long::sum
            );
        }

        return toAnalyticsList(counts);
    }

    /**
     * Retrieve all indexed logs for analytics.
     *
     * Unlike the normal search API, this method
     * does not use the 100-result limit.
     */
    private List<LogRecord> getAllLogs() {
        return luceneService.searchAllLogs();
    }

    private List<Map<String, Object>> toAnalyticsList(
            Map<String, Long> counts) {

        List<Map<String, Object>> result =
                new ArrayList<>();

        for (Map.Entry<String, Long> entry : counts.entrySet()) {

            Map<String, Object> item =
                    new LinkedHashMap<>();

            item.put("name", entry.getKey());
            item.put("value", entry.getValue());

            result.add(item);
        }

        return result;
    }
}