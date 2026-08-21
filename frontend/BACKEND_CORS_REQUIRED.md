# Required Spring Boot CORS setup

Postman does not enforce browser CORS. React does.

Create:
`src/main/java/com/FieldService/Security/CorsConfig.java`

```java
package com.FieldService.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of(
                "http://localhost:5173"
                // Add deployed frontend later:
                // "https://your-frontend.onrender.com"
        ));

        config.setAllowedMethods(List.of(
                "GET", "POST", "PUT", "DELETE", "OPTIONS"
        ));

        config.setAllowedHeaders(List.of(
                "Authorization", "Content-Type"
        ));

        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
```

Then add this to the `HttpSecurity` chain in `SecurityConfig.java`, immediately after CSRF:
```java
.cors(cors -> {})
```

Commit and redeploy the backend before testing React against Render.
