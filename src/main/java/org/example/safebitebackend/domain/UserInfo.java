package org.example.safebitebackend.domain;

import jakarta.persistence.Embeddable;

@Embeddable
public class UserInfo {

    protected String firstName;
    protected String surname;
    protected String phoneNumber;

    protected UserInfo() {}

    public UserInfo(Builder builder) {
        this.firstName = builder.firstName;
        this.surname = builder.surname;
        this.phoneNumber = builder.phoneNumber;
    }

    public static class Builder {
        private String firstName;
        private String surname;
        private String phoneNumber;

        public Builder setFirstName(String firstName) {
            this.firstName = firstName;
            return this;
        }
        public Builder setSurname(String surname) {
            this.surname = surname;
            return this;
        }
        public Builder setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
            return this;
        }

        public UserInfo build(){
            return new UserInfo(this);
        };
    }

    public String getFirstName() {
        return firstName;
    }

    public String getSurname() {
        return surname;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "firstName='" + firstName + '\'' +
                ", surname='" + surname + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }
}
