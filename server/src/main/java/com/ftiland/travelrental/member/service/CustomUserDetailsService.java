package com.ftiland.travelrental.member.service;

import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Long memberId;
        try {
            memberId = Long.parseLong(username);
        } catch (NumberFormatException e) {
            throw new UsernameNotFoundException("Invalid user id: " + username);
        }

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember == null) {
            throw new UsernameNotFoundException("Cannot find member by id.");
        } else {
            Member member = optionalMember.get();
            return new org.springframework.security.core.userdetails.User(
                    String.valueOf(String.valueOf(member.getMemberId())),
                    null,
                    null
            );
        }
    }
}
