import React from "react";
import { Carousel } from "react-responsive-carousel";
import { makeStyles } from "@material-ui/core/styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../assets/css/commons/WCCarousel.css";

const useStyles = makeStyles(theme => ({
    wrapper: {
        margin: "auto 1rem",
        display: "flex",
        justifyContent: "center"
    }
}));

const WCCarousel = props => {
    const classes = useStyles();
    const getCarouselImg = () => {
        const imgSrcArray = props.imgSrcArray;
        const imgSrcComponents = [];
        imgSrcArray.forEach(src => {
            const srcComponent = (
                <div>
                    <img src={src} alt="" />
                </div>
            );
            imgSrcComponents.push(srcComponent);
        });
        return imgSrcComponents;
    };

    return (
        <div className={classes.wrapper + " WCCarousel"}>
            <Carousel
                showThumbs={false}
                showStatus={false}
                autoPlay={true}
                infiniteLoop={true}
            >
                {getCarouselImg()}
            </Carousel>
        </div>
    );
};

export default WCCarousel;
