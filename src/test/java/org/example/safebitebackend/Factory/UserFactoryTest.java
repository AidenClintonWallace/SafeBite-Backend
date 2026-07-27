package org.example.safebitebackend.Factory;

import org.example.safebitebackend.domain.UserEntity;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserFactoryTest {

    @Test
    void createUser() {
        UserEntity newUser = UserFactory.createUser(
                "Johnno",
                "Mongommo",
                "011 224 4001",
                "johnny",
                "JohnMongom@gmail.com",
                "1234"
        );

        assertNotNull(newUser);
        assertEquals("Johnno", newUser.getUserInfo().getFirstName());
        System.out.println(newUser);

    }
}