import '../../assets/css/card/StudyCard.css'

import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import PersonIcon from '@material-ui/icons/Person'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { History, LocationState } from 'history'

import WCDialog from '../commons/WCDialog'
import { removeStudyCardFromCollection } from '../api/StudyCardsApiHelper'
import { ConceptCard } from '../../types/cards'

interface Props {
    id: number,
    history: History<LocationState>,
    title: string,
    username: string,
    description: string,
    conceptCards: ConceptCard[],
    editMode: boolean,
    cardColor: string
};

const useStyles = makeStyles(theme => ({
    card: {
        width: "90%",
        margin: "2rem auto"
    },
    cardContent: {
        minHeight: "10rem",
        position: "relative",
        zIndex: 100
    },
    halfCircle: {
        borderRadius: "100% 7% 7% 0",
        height: "100%",
        width: "35%",
        position: "absolute",
        right: "0",
        bottom: "0"
    },
    title: {
        opacity: 0.87,
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        width: "85%"
    },
    svg: {
        width: "3rem"
    },
    author: {
        marginTop: "0.5rem",
        display: "flex",
        alignItems: "center",
        position: "absolute",
        bottom: "1rem"
    },
    options: {
        position: "absolute",
        top: "0",
        right: "0.5rem",
        fontSize: "1rem",
        padding: "0.5rem 0.5rem 1rem 1rem",
        zIndex: 1000
    },
    numConcepCardtWrapper: {
        width: "45%",
        marginTop: "1.5rem",
        position: "absolute",
        bottom: "1rem",
        right: "1rem"
    },
    numConceptCard: {
        textAlign: "center",
        fontSize: "3rem",
        opacity: 0.87
    },
    conceptCardText: {
        textAlignLast: "center",
        fontSize: "1.2rem",
        opacity: 0.87
    }
}));

const readingFontFamily = "'Noto Serif', serif";

const StudyCard = (props: Props) => {
    const classes = useStyles();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isRemoved, setIsRemoved] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const onClickOptionHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {

        event.stopPropagation();
        
        setAnchorEl(event.currentTarget);

    }

    const renderOptionButton = (): JSX.Element | null => {

        if (!props.editMode) {

            return null;

        } else {

            return (
                <div className={classes.options} onClick={onClickOptionHandler}>
                    <MoreHorizIcon fontSize="large" />
                </div>
            );

        }
    };

    const onCancelDialogHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setIsDialogOpen(false);
    };

    const onConfirmDialogHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setIsDialogOpen(false);
        setIsRemoved(true);
        removeStudyCardFromCollection(props.id);
    };

    const getCardColor = (cardColor?: string): string => {

        if (!cardColor) {
            return "default";
        }

        return cardColor;

    };

    const onCardClickHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {

        if (!props.history) {
            return;
        }

        props.history.push("/detail?id=" + props.id);

    };

    const handleOptionMenuClose = () => {

        setAnchorEl(null);

    };

    const onClickRemove = (event: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {

        handleOptionMenuClose();

        setIsDialogOpen(true);
        
    };

    if (isRemoved) {

        return null;

    }

    return (
        <div>
            <Card 
                className={classes.card + " StudyCard " + (getCardColor(props.cardColor))} 
                style={{ overflow: "visible" }}
                onClick={onCardClickHandler}
            >
                <CardActionArea>
                    <CardContent className={classes.cardContent}>

                        {renderOptionButton()}

                        <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                            {props.title}
                        </Typography>
                        <Typography variant="body1" className="description">
                            <Box fontFamily={readingFontFamily} component="span">
                                {props.description || "This guy does not write description :L"}
                            </Box>
                        </Typography>

                        <div className={classes.author + " author"}>
                            <PersonIcon /> {props.username}
                        </div>

                        <div className={classes.numConcepCardtWrapper}>
                            <div className={classes.numConceptCard}>
                                {props.conceptCards ? props.conceptCards.length : ""}
                            </div>
                            <div className={classes.conceptCardText}>
                                Concept Card(s)
                            </div>
                        </div>

                    </CardContent>
                    <div className={classes.halfCircle + " halfCircle"}>
                    </div>
                </CardActionArea>
            </Card>
            <WCDialog
                open={isDialogOpen}
                cancelHandler={onCancelDialogHandler}
                confirmHandler={onConfirmDialogHandler}
                title={"Warning"}
                content={"Remove cards created by you will permanently delete it, you sure?"}
            />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleOptionMenuClose}
            >
                <MenuItem onClick={onClickRemove}>Remove</MenuItem>
            </Menu>
        </div>
    );
};

export default StudyCard;
