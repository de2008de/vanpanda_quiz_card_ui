import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import PublishIcon from "@material-ui/icons/Publish";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import ServerConfig from "../../configs/ServerConfig";
import { doAuthentication } from "../../utils/auth";
import { Typography } from "@material-ui/core";
import TRANSLATED_ERROR_TEXT from "../../resources/translatedText/ErrorMessagesEn";

const postStudyCardApi = "/api/v1/card/studycard";

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        display: "flex",
        width: "auto"
    },
    fabButton: {
        margin: "1rem 0.5rem 1rem 0.5rem"
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    },
    conceptCardInput: {
        margin: "1rem 1rem",
        padding: "1rem",
        borderRadius: "1rem 0.1rem 1rem 0.3rem",
        position: "relative"
    },
    conceptCardInnerInput: {
        backgroundColor: theme.palette.primary.light,
        borderRadius: "inherit",
        padding: "1rem 1.5rem 1rem 1rem"
    },
    conceptCardTextField: {
        width: "100%"
    },
    deleteIcon: {
        position: "absolute",
        top: 0,
        right: 0
    },
    form: {
        width: "95%",
        margin: "auto"
    },
    showDescriptionOrSchool: {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
        margin: "0.5rem"
    },
    errorMessageContainer: {
        margin: "0.5rem",
        color: theme.palette.secondary.main
    }
}));

const AddStudyCardPage = props => {
    doAuthentication(props.history);
    const classes = useStyles();
    const [input, setInput] = useState({
        title: "",
        description: "",
        school: "",
        conceptCards: [{
            title: "",
            content: ""
        }]
    });
    const [errorMessages, setErrorMessages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDescriptionHidden, setIsDescriptionHidden] = useState(true);
    const [isSchoolHidden, setIsSchoolHidden] = useState(true);

    const onChangeHandler = sFieldName => {
        return e => {
            const oNewInput = {};
            oNewInput[sFieldName] = e.target.value;
            setInput(prevState => {
                return {
                    ...prevState,
                    ...oNewInput
                };
            });
        };
    };

    const onConceptCardChangeHandler = (index, sFieldName) => {
        return e => {
            const aConceptCards = input.conceptCards;
            aConceptCards[index][sFieldName] = e.target.value;
            setInput(prevState => {
                return {
                    ...prevState,
                    conceptCards: aConceptCards
                };
            });
        };
    };

    const getSchoolOptions = () => {
        const oOptions = {
            sfu: "Simon Fraser University",
            ubc: "University of British Columbia"
        };
        const aReturnOptions = [];
        let key;
        for (key in oOptions) {
            const oOptionComponent = (
                <MenuItem key={key} value={key}>
                    {oOptions[key]}
                </MenuItem>
            );
            aReturnOptions.push(oOptionComponent);
        }
        return aReturnOptions;
    };

    const addConceptCardOnClickHandler = () => {
        const oConceptCardInput = {
            title: "",
            content: ""
        };
        const aConceptCards = [...input.conceptCards];
        aConceptCards.push(oConceptCardInput);
        setInput(prevState => {
            return {
                ...prevState,
                conceptCards: aConceptCards
            };
        });
    };

    const onDeleteHandler = index => {
        return () => {
            const aConceptCards = [...input.conceptCards];
            aConceptCards.splice(index, 1);
            setInput(prevState => {
                return {
                    ...prevState,
                    conceptCards: aConceptCards
                };
            });
        };
    };

    const getConceptCardInputFields = () => {
        const aConceptCardInputComponents = [];
        input.conceptCards.forEach((oConceptCardInput, index) => {
            const conceptCardComponent = (
                <Card className={classes.conceptCardInput} key={index}>
                    <Fab
                        color="secondary"
                        className={classes.deleteIcon}
                        onClick={onDeleteHandler(index)}
                    >
                        <DeleteIcon />
                    </Fab>
                    <Box
                        component="div"
                        className={classes.conceptCardInnerInput}
                    >
                        <TextField
                            id="conceptCardTitle"
                            label="Title"
                            className={
                                classes.textField +
                                " " +
                                classes.conceptCardTextField
                            }
                            value={input.conceptCards[index].title}
                            onChange={onConceptCardChangeHandler(
                                index,
                                "title"
                            )}
                            margin="dense"
                        />
                        <TextField
                            id="conceptCardContent"
                            multiline
                            variant="filled"
                            rows={10}
                            label="Content"
                            className={
                                classes.textField +
                                " " +
                                classes.conceptCardTextField
                            }
                            value={input.conceptCards[index].content}
                            onChange={onConceptCardChangeHandler(
                                index,
                                "content"
                            )}
                            margin="dense"
                        />
                    </Box>
                </Card>
            );
            aConceptCardInputComponents.push(conceptCardComponent);
        });
        return aConceptCardInputComponents;
    };

    const showDescriptionField = () => {
        setIsDescriptionHidden(false);
    };

    const showSchoolField = () => {
        setIsSchoolHidden(false);
    };

    const showErrorMessage = () => {
        const aErrorComponents = [];
        errorMessages.forEach((message, index) => {
            const errorComponent = (
                <Typography
                    key={index}
                >
                    {message}
                </Typography>
            );
            aErrorComponents.push(errorComponent);
        });
        return aErrorComponents;
    };

    const addErrorMessage = message => {
        setErrorMessages(prevState => {
            const aErrorMessages = [...prevState];
            aErrorMessages.push(message);
            return aErrorMessages;
        });
    };

    const clearErrorMessages = () => {
        setErrorMessages([]);
    };

    const isConceptCardValid = oCard => {
        let bIsValid = true;
        if (oCard.title === null || oCard.title === undefined || oCard.title.trim() === "") {
            addErrorMessage(TRANSLATED_ERROR_TEXT.CONCEPT_CARD_TITLE_REQUIRED);
            bIsValid = false;
        }
        if (oCard.content === null || oCard.content === undefined || oCard.content.trim() === "") {
            addErrorMessage(TRANSLATED_ERROR_TEXT.CONCEPT_CARD_CONTENT_REQUIRED);
            bIsValid = false;
        }
        return bIsValid;
    };

    const isInputValid = () => {
        let bIsValid = true;
        if (!input.conceptCards || input.conceptCards.length === 0) {
            addErrorMessage(TRANSLATED_ERROR_TEXT.AT_LEAST_ONE_CONCEPT_CARD);
            bIsValid = false;
        }
        if (input.title === null || input.title === undefined || input.title.trim() === "") {
            addErrorMessage(TRANSLATED_ERROR_TEXT.STUDY_CARD_TITLE_REQUIRED);
            bIsValid = false;
        }
        if (input.conceptCards && input.conceptCards.length >= 0) {
            for (let i = 0; i < input.conceptCards.length; i++) {
                const oConceptCard = input.conceptCards[i];
                if (!isConceptCardValid(oConceptCard)) {
                    bIsValid = false;
                }
            }
        }
        return bIsValid;
    };

    const onSubmitHandler = () => {
        clearErrorMessages();
        if (!isInputValid()) {
            return false;
        }
        setIsSubmitting(true);
        const headers = {
            token: window.localStorage.getItem("token")
        };
        axios
            .post(ServerConfig.api.ip + postStudyCardApi, {
                title: input.title,
                description: input.description,
                school: input.school,
                conceptCards: input.conceptCards
            }, {
                headers: headers
            })
            .then(() => {
                setIsSubmitting(false);
                props.history.push("/success");
            })
            .catch(() => { });
    };

    return (
        <div className="AddStudyCardPage">
            <form className={classes.form}>
                <TextField
                    id="title"
                    label="Title"
                    className={classes.textField}
                    value={input.title}
                    onChange={onChangeHandler("title")}
                    margin="dense"
                />
                <TextField
                    id="description"
                    label="Description"
                    className={classes.textField}
                    value={input.description}
                    onChange={onChangeHandler("description")}
                    margin="dense"
                    style={isDescriptionHidden ? { display: "none" } : {}}
                />
                <TextField
                    id="school"
                    select
                    label="School"
                    className={classes.textField}
                    value={input.school}
                    onChange={onChangeHandler("school")}
                    margin="dense"
                    style={isSchoolHidden ? { display: "none" } : {}}
                >
                    {getSchoolOptions()}
                </TextField>
                <div
                    className={classes.showDescriptionOrSchool}
                    onClick={showDescriptionField}
                    style={!isDescriptionHidden ? { display: "none" } : {}}
                >
                    + Description
                </div>
                <div
                    className={classes.showDescriptionOrSchool}
                    onClick={showSchoolField}
                    style={!isSchoolHidden ? { display: "none" } : {}}
                >
                    + School
                </div>
                {getConceptCardInputFields()}
                <div className={classes.errorMessageContainer}>
                    {showErrorMessage()}
                </div>
                <Fab
                    variant="extended"
                    size="small"
                    color="secondary"
                    aria-label="addConceptCard"
                    className={classes.fabButton}
                    onClick={addConceptCardOnClickHandler}
                >
                    <AddIcon className={classes.extendedIcon} />
                    Add a Concept Card
                </Fab>
                <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    aria-label="submit"
                    className={classes.fabButton}
                    onClick={onSubmitHandler}
                    disabled={isSubmitting ? true : false}
                >
                    <PublishIcon />
                    Submit
                </Fab>
            </form>
        </div>
    );
};

export default AddStudyCardPage;
