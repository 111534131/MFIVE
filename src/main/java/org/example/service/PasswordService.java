package org.example.service;

import org.springframework.stereotype.Service;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

/**
 * 密碼加密服務
 * 使用 SHA-256 + Salt 進行密碼雜湊
 */
@Service
public class PasswordService {

    private static final int SALT_LENGTH = 16;

    /**
     * 對密碼進行加密（加鹽雜湊）
     * 
     * @param password 原始密碼
     * @return 格式: salt$hashedPassword
     */
    public String hashPassword(String password) {
        try {
            // 產生隨機鹽值
            SecureRandom random = new SecureRandom();
            byte[] salt = new byte[SALT_LENGTH];
            random.nextBytes(salt);
            String saltStr = Base64.getEncoder().encodeToString(salt);

            // 使用 SHA-256 雜湊密碼+鹽
            String hashedPassword = hash(password, saltStr);

            // 回傳格式: salt$hashedPassword
            return saltStr + "$" + hashedPassword;
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("密碼加密失敗", e);
        }
    }

    /**
     * 驗證密碼是否正確
     * 
     * @param password       使用者輸入的密碼
     * @param storedPassword 資料庫中儲存的加密密碼 (格式: salt$hashedPassword)
     * @return true 如果密碼正確
     */
    public boolean verifyPassword(String password, String storedPassword) {
        try {
            // 檢查舊密碼格式（未加密的明文密碼，向後相容）
            if (!storedPassword.contains("$")) {
                // 這是舊的明文密碼，直接比對
                return password.equals(storedPassword);
            }

            // 解析鹽值和雜湊後的密碼
            String[] parts = storedPassword.split("\\$");
            if (parts.length != 2) {
                return false;
            }

            String salt = parts[0];
            String storedHash = parts[1];

            // 使用相同的鹽值雜湊輸入的密碼
            String inputHash = hash(password, salt);

            // 比對雜湊值
            return storedHash.equals(inputHash);
        } catch (NoSuchAlgorithmException e) {
            return false;
        }
    }

    private String hash(String password, String salt) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(salt.getBytes());
        byte[] hashedBytes = md.digest(password.getBytes());
        return Base64.getEncoder().encodeToString(hashedBytes);
    }
}
