import React, { Fragment } from "react";
import GameCard from "./user/Card";
 import { FeaturedGiftCards } from "./user/FeaturedGiftCards";
import { AffiliateProgramSection } from "./user/AffiliateProgramSection";
import GamingExperiencePage from "./user/GamingExperiencePage";
import Collection from "./user/Collection";
import { Navbar } from "./user/Navbar";
import Footer from "./user/Footer";
import { Services } from "./user/Services";

 const WelcomePage = React.memo(() => {
  return (

     <Fragment>
      <Navbar/>
      <Services/>
      <GameCard />
      <FeaturedGiftCards />
      <AffiliateProgramSection/>
      <Collection/>
      <GamingExperiencePage/>
      <Footer/>
    </Fragment>
  );
});
export default WelcomePage