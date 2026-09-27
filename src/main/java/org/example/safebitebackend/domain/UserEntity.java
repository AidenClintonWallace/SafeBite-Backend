package org.example.safebitebackend.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users") // FIXED: must match schema.sql table name
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public UserEntity() {}

    // Getters
    public int getId() { return id; }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
    public String getPhoneNumber() { return phoneNumber; }
    public String getPasswordHash() { return passwordHash; }

    // Setters
    public void setId(int id) { this.id = id; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public void setEmail(String email) { this.email = email; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    // Builder for compatibility with your existing code
    public static class Builder {
        private int id;
        private String fullName;
        private String email;
        private String phoneNumber;
        private String passwordHash;

        public Builder setUserId(int id){ this.id = id; return this; }
        public Builder setFullName(String fullName){ this.fullName = fullName; return this; }
        public Builder setEmail(String email){ this.email = email; return this; }
        public Builder setPhoneNumber(String phoneNumber){ this.phoneNumber = phoneNumber; return this; }
        public Builder setPassword(String passwordHash){ this.passwordHash = passwordHash; return this; }
        public Builder setUsername(String username){ this.fullName = username; return this; } // for old code

        public UserEntity build(){
            UserEntity user = new UserEntity();
            user.id = this.id;
            user.fullName = this.fullName;
            user.email = this.email;
            user.phoneNumber = this.phoneNumber;
            user.passwordHash = this.passwordHash;
            user.createdAt = LocalDateTime.now();
            return user;
        }
    }

    @Override
    public String toString() {
        return "UserEntity{" + "id=" + id + ", fullName='" + fullName + "', email='" + email + "', phoneNumber='" + phoneNumber + "'}";
    }
}
