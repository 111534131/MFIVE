package org.example.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import java.util.Map;

@Service
public class RecaptchaService {

    private static final String RECAPTCHA_SECRET = "6LeYEDMsAAAAALV1nnNaotkQqiXyoXCHZBpxQQWW";
    private static final String RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

    private final RestTemplate restTemplate;

    public RecaptchaService() {
        this.restTemplate = new RestTemplate();
    }

    /**
     * 驗證 reCAPTCHA token
     * 
     * @param token 前端傳來的 reCAPTCHA response token
     * @return true 如果驗證成功，false 如果失敗
     */
    public boolean verify(String token) {
        if (token == null || token.isEmpty()) {
            return false;
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("secret", RECAPTCHA_SECRET);
            params.add("response", token);

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(
                    RECAPTCHA_VERIFY_URL,
                    request,
                    Map.class);

            if (response.getBody() != null) {
                Boolean success = (Boolean) response.getBody().get("success");
                return Boolean.TRUE.equals(success);
            }
        } catch (Exception e) {
            System.err.println("reCAPTCHA verification error: " + e.getMessage());
        }

        return false;
    }
}
