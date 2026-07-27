package org.example.safebitebackend.Factory;

import org.example.safebitebackend.domain.UserEntity;
import org.example.safebitebackend.domain.UserInfo;

public class UserFactory {
    public static UserEntity createUser(
            String firstName,
            String surname,
            String phoneNumber,
            String username,
            String email,
            String password
    ) {
        UserInfo userInfo = new UserInfo.Builder()
                .setFirstName(firstName)
                .setSurname(surname)
                .setPhoneNumber(phoneNumber)
                .build();

        return new UserEntity.Builder()
                .setUserInfo(userInfo)
                .setUsername(username)
                .setEmail(email)
                .setPassword(password)
                .build();
    }
}
