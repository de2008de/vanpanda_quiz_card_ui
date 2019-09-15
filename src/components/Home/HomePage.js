import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "../../assets/css/Home/HomePage.css";

const HomePage = () => {
    return (
        <div className="HomePage">
            <div className="headerContainer">
                <div>
                    <Typography variant="h5">
                        <Box fontWeight="bold">今天的</Box>
                    </Typography>
                    <Typography variant="h5">
                        <Box>学习课程</Box>
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
