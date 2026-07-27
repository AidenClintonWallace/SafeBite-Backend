package org.example.safebitebackend.domain;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Users")
public class UserEntity extends UserInfo {
    @Id
    private int userId;

    @Embedded
    private UserInfo userInfo;

    private String username;
    private String email;
    private String password;

    @OneToMany(mappedBy = "User")
    @JoinColumn(name = "productId")
    private List<FoodEntity> foods = new ArrayList<>();

    public UserEntity() {}

    public UserEntity(Builder builder){
        this.userId = builder.userId;
        this.userInfo = builder.userInfo;
        this.username = builder.username;
        this.email = builder.email;
        this.password = builder.password;
        this.foods = builder.foods;
    }

    public static class Builder{
        private int userId;
        private UserInfo userInfo;
        private String username;
        private String email;
        private String password;
        private List<FoodEntity> foods;

        public Builder setUserId(int userId){
            this.userId = userId;
            return this;
        }
        public Builder setUserInfo(UserInfo userInfo){
            this.userInfo = userInfo;
            return this;
        }
        public Builder setUsername(String username){
            this.username = username;
            return this;
        }
        public Builder setEmail(String email){
            this.email = email;
            return this;
        }
        public Builder setPassword(String password){
            this.password = password;
            return this;
        }
        public Builder setFoods(List<FoodEntity> foods){
            this.foods = foods;
            return this;
        }
        public UserEntity build(){
            return new UserEntity(this);
        }
    }

    public int getUserId() {
        return userId;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String toString() {
        return "UserEntity{" +
                "userId=" + userId +
                ", userInfo=" + userInfo +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", foods=" + foods +
                '}';
    }
}
