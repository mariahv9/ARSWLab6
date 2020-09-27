package edu.eci.arsw.cinema.services;

import edu.eci.arsw.cinema.filters.*;
import edu.eci.arsw.cinema.model.*;
import edu.eci.arsw.cinema.persistence.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.Service;
import java.util.*;

/**
 * @author cristian
 */

@Service
@Qualifier("cinemaServicies")

public class CinemaServices implements CinemaServicesInterface{
    final String a = "filterOfGenre";

    @Autowired
    @Qualifier("InMemoryCinemaPersistence")
    CinemaPersitence cps;

    @Autowired
    @Qualifier(a)
    Filter filter;

    /**
     *
     * @param c cinema's instance
     * @return the cinema of the given name created by the given author
     * @throws CinemaException
     */
    public void addNewCinema(Cinema c){
        try {
            cps.saveCinema(c);
        } catch (CinemaPersistenceException e) {
            e.printStackTrace();
        }
    }

    /**
     *
     * @return  All cinema's instance
     */
    public Set<Cinema> getAllCinemas() throws CinemaException{
        return cps.getAllCinema();
    }
    
    /**
     * 
     * @param name cinema's name
     * @return the cinema of the given name created by the given author
     * @throws CinemaException
     */
    public Cinema getCinemaByName(String name) throws CinemaException{
        try {
           if (cps.getCinema(name)==null){
               throw new CinemaException("The cinema: "+ name +" Unexist");
            }else {
               return cps.getCinema(name);
           }

        } catch (CinemaPersistenceException e) {
            throw new CinemaException(e.getMessage());
        }
    }

    /**
     * @param row row of the seats
     * @param col col of the seats
     * @param cinema cinema's name
     * @param date movie's date
     * @param movieName movie's name
     */
    public void buyTicket(int row, int col, String cinema, String date, String movieName){
        try {
            cps.buyTicket(row, col, cinema, date, movieName);
        }catch (CinemaException ce){
            System.out.println(ce.toString());
        }
    }

    /**
     * @param cinema cinema's name
     * @param date movie's date
     * @return All functions of the given cinema's name
     */
    public List<CinemaFunction> getFunctionsbyCinemaAndDate(String cinema, String date) throws CinemaException {
         List<CinemaFunction> cinemaFunctions= cps.getFunctionsbyCinemaAndDate(cinema, date);
         if (cinemaFunctions==null || cinemaFunctions.isEmpty()){
             throw new CinemaException("   ...");
         }else{
             return cinemaFunctions;
         }
    }

    /**
     * @param c cinema's instance
     * @param date movie's date
     * @param genre movie's genre
     * @return All functions of the given genre
     */
    public List<CinemaFunction> getFunctionsFilter(Cinema c,String date,String genre){
        return filter.filter(c,date,genre);
    }

    /**
     * @param c cinema's instance
     * @param date movie's date
     * @param x amount expected of seats in the movie
     * @return All functions of the given
     */
    public List<CinemaFunction> geFunctionsFilter(Cinema c,String date, Integer x){
        return filter.filter(c,date,x);
    }

    @Override
    public CinemaFunction getMovie(String cinema, String date, String moviename) throws CinemaException {
        List<CinemaFunction> cinemaFunctions= cps.getFunction(cinema, date, moviename);
        if(cinemaFunctions!=null || cinemaFunctions.isEmpty()){
            return cinemaFunctions.get(0);
        }else {
            throw new CinemaException("...");
        }
    }

    @Override
    public void addFunction(String cinema, CinemaFunction cinemaFunction) throws CinemaException {
        cps.addFunction(cinema, cinemaFunction);
    }

    public void filterChange(String fil){
        if(a!=fil) {
            if(fil=="filterOfSeats") {
                filter = new SeatsFilter();
            }else {
                filter = new GenreFilter();
            }
        }
    }

    @Override
    public void setFunction(String cinema, CinemaFunction cinemaFunction) throws CinemaException {
        cps.setFunction(cinema, cinemaFunction);
    }
}