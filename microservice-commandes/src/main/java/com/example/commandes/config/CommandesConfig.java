package com.example.commandes.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "mes-config-ms")
@RefreshScope
@Data
public class CommandesConfig {
    private Integer commandesLast = 10;
}
