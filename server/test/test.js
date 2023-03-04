const assert = require('assert');
const AuthService = require('../services/authService')
const TokenService = require('../services/tokenService')
describe('Tokens', function () {

    describe("validateAccessToken", function() {
        it("проверка на валидность неправильного токена", function() {
            assert.equal(TokenService.validateAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImxvZ2luIjoiTGVyYSIsImVtYWlsIjoidHJvc2hrb19sZXJrYUBtYWlsLnJ1IiwicGhvbmUiOiIrMzc1KDMzKTk5Mi0wNC0zMiIsInJvbGUiOiJQQVRJRU5UIiwiaXNfYWN0aXZhdGVkIjp0cnVlLCJpZF9hY2MiOjIwLCJpYXQiOjE2Nc4OTQxODEsImV4cCI6MTY3Nzg5Nzc4MX0.ozPuJqfgRXdQIdrVV7Nueb29Zl24xyGKMBWwDhROAS8"), null);
        });
        it("проверка, что токен пренадлежит пользователью с ролью 'PATIENT'", function() {
            assert.equal(TokenService.validateAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImxvZ2luIjoiTGVyYSIsImVtYWlsIjoidHJvc2hrb19sZXJrYUBtYWlsLnJ1IiwicGhvbmUiOiIrMzc1KDMzKTk5Mi0wNC0zMiIsInJvbGUiOiJQQVRJRU5UIiwiaXNfYWN0aXZhdGVkIjp0cnVlLCJpZF9hY2MiOjIwLCJpYXQiOjE2Nzc4OTQ1NDcsImV4cCI6MTY3Nzg5NDU3N30.vPhW93UDQpwIZ-SuTN0mMk3PyLG5H6F8VSUl_GgDxws").role, "PATIENT");
        });
    });
});