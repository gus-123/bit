package com.example.spring_17.oauth.infra.oauth.google.client;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

import com.example.spring_17.oauth.infra.oauth.google.dto.GoogleMemberResponse;
import com.example.spring_17.oauth.infra.oauth.google.dto.GoogleToken;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.PostExchange;

public interface GoogleApiClient {

    @PostExchange(url = "https://oauth2.googleapis.com/token")
    GoogleToken fetchToken(@RequestParam MultiValueMap<String, String> params);

    @GetExchange("https://www.googleapis.com/oauth2/v2/userinfo")
    GoogleMemberResponse fetchMember(@RequestHeader(AUTHORIZATION) String bearerToken);
}
