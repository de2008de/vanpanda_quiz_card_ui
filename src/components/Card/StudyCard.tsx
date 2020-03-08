import '../../assets/css/card/StudyCard.css'

import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import DoneIcon from '@material-ui/icons/Done'
import PersonIcon from '@material-ui/icons/Person'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import WCDialog from '../commons/WCDialog'
import { removeStudyCardFromCollection } from '../api/StudyCardsApiHelper'
import { ConceptCard } from '../../types/cards'

interface Props {
    id: number,
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
        margin: "2rem auto",
        color: "#fff"
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
        overflow: "hidden"
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
    removeButton: {
        position: "absolute",
        top: "1rem",
        right: "0.5rem",
        fontSize: "1rem",
        color: theme.palette.secondary.main,
        padding: "0.5rem"
    },
    numConcepCardtWrapper: {
        width: "45%",
        marginTop: "1.5rem",
        position: "absolute",
        bottom: "1rem",
        right: "1rem",
        color: "#fff"
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

    const renderRemoveButton = () => {
        if (!props.editMode) {
            return null;
        } else {
            if (!isRemoved) {
                return (
                    <div className={classes.removeButton + " remove-button"} onClick={onClickRemoveHandler}>
                        <Chip
                            size="medium"
                            label="Remove"
                            variant="outlined"
                            color="primary"
                        />
                    </div>
                );
            } else {
                return (
                    <div className={classes.removeButton + " remove-button"}>
                        <Chip
                            size="medium"
                            label="Removed"
                            variant="default"
                            color="secondary"
                            deleteIcon={<DoneIcon />}
                        />
                    </div>
                );
            }
        }
    };

    const onClickRemoveHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.preventDefault();
        setIsDialogOpen(true);
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

    const getCardColor = (index?: number): string => {

        if (index !== undefined) {
            const mod = index % 3;

            switch (mod) {
                case 0:
                    return "blue";
                case 1:
                    return "orange";
                case 2:
                    return "red";
                default:
                    return "blue";
            }
        }

        const num = Math.floor(Math.random() * 3);

        switch (num) {
            case 0:
                return "blue";
            case 1:
                return "orange";
            case 2:
                return "red";
            default:
                return "blue";
        }

    };

    return (
        <div>
            <Card className={classes.card + " StudyCard " + (props.cardColor || getCardColor(props.id))} style={{ overflow: "visible" }}>
                <CardActionArea>
                    <CardContent className={classes.cardContent}>

                        {renderRemoveButton()}

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
                content={"Do you want to remove this card from your collection? If this card is created by you, it will be permanently deleted as well."}
            />
        </div>
    );
};

export default StudyCard;
