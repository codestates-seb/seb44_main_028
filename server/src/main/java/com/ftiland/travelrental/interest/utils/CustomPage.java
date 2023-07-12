package com.ftiland.travelrental.interest.utils;

import com.ftiland.travelrental.interest.dto.InterestDto;
import com.ftiland.travelrental.interest.entity.Interest;

import java.util.ArrayList;

public class CustomPage {
    public static ArrayList<Interest> Paging(int page, int size,ArrayList<Interest> list){
        int startIdx = (page-1)*size;
        int endIdx = page*size-1;
        int listSize = list.size();
        ArrayList<Interest> result = new ArrayList<>();


        if(startIdx<=listSize && endIdx>=listSize){
            for(int i =startIdx;i<listSize;i++){
                result.add(list.get(i));
            }
        }

        else if(startIdx>listSize){
            return result;
        }

        else{
            for(int i =startIdx;i<=endIdx;i++){
                result.add(list.get(i));
            }
        }

        return result;


    }
}
