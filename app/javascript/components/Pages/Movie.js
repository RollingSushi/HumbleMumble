import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import DescriptionImage from "../MediaComponents/DescriptionImage";
import Description from "../MediaComponents/Description";
import Statistics from "../MediaComponents/Statistics";
import Friends from "../MediaComponents/Friends";
import { Container, Grid } from "@material-ui/core";
import ContentCarousel from "../MediaComponents/ContentCarousel";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavBar2 from "../NavBar/NavBar2";

function Movie() {
  let { slug } = useParams();
  const searchTerm = decodeURIComponent(slug);
  const URIsearchTerm = encodeURI(slug);
  const [Movies, setMovies] = useState({});
  const [RT, setRT] = useState([]);

  const movieID = localStorage.getItem("movieID");

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=f6fef0b6b13ff8c438075fdee50bb9a8&language=en-US`
      )
      .then((resp) => setMovies(resp.data))
      .catch((resp) => console.log(resp));

    axios
      .get(`/movie/${URIsearchTerm}`)
      .then((resp) => setRT(resp.data))
      .catch((resp) => console.log(resp));
  }, [RT.length]);

  const movie = Movies;
  //Filter still provides old movies <2000 with the exact same name, reduce further for the highest popularity
  console.log(RT);

  return (
    <div>
      <NavBar2 page="movie" />
      <Container maxWidth="lg" style={{ marginTop: 50 }}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          spacing={4}
        >
          <Grid item xs>
            <Grid
              container
              spacing={1}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid item xs>
                {/* Top left image here */}
                <DescriptionImage
                  imgUrl={"http://image.tmdb.org/t/p/w300" + movie.poster_path}
                  name={movie.title}
                  type="movie"
                ></DescriptionImage>
              </Grid>
              <Grid item xs={9}>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="stretch"
                  spacing={2}
                >
                  <Grid item xs>
                    {/* Carousel here */}
                    <ContentCarousel movieId={movie.id} RT={RT} />
                  </Grid>
                  <Grid item xs>
                    {/* Description here */}
                    <Description
                      h={185}
                      title="Description"
                      description={movie.overview}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            {/* Statistics here */}
            <Statistics />
          </Grid>
          <Grid item xs>
            {/* Friends reviews here */}
            <Friends />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Movie;
