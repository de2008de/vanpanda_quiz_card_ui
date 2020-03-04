import CircularProgress from '@material-ui/core/CircularProgress'
import Fab from '@material-ui/core/Fab'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add'
import PublishIcon from '@material-ui/icons/Publish'
import axios from 'axios'
import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { History, LocationState } from 'history'

import ServerConfig from '../../configs/ServerConfig'
import HTTP_RESPONSE_STATUS from '../../resources/http/HttpResponseStatus'
import TRANSLATED_ERROR_TEXT from '../../resources/translatedText/ErrorMessagesEn'
import ConceptCardInputField from '../Card/ConceptCardInputField'
import { CARD_LENGTH_LIMIT } from '../../resources/lengthLimit/CardLengthLimit'
import { ConceptCard, StudyCard } from '../../types/cards'
import { doAuthentication } from '../../utils/auth'

const postStudyCardApi = "/api/v1/card/studycard";

interface Props {
    history: History<LocationState>
};

interface input {
    [index: string]: any
};

// Will store options on backend and render them dynamically
interface SchoolOptions {
    [index: string]: string
};

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
    },
    loaderContainer: {
        display: "flex",
        justifyContent: "center"
    }
}));

const AddStudyCardPage = (props: Props) => {

    doAuthentication(props.history);

    const classes = useStyles();

    const [input, setInput] = useState<StudyCard>({
        title: "",
        description: "",
        school: "",
        conceptCards: [{
            term: "",
            definition: ""
        }]
    });
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDescriptionHidden, setIsDescriptionHidden] = useState(true);
    const [isSchoolHidden, setIsSchoolHidden] = useState(true);

    const getOnChangeHandler = (name: string) => {

        return (event: React.ChangeEvent<HTMLInputElement>) => {

            const input: input = {};
            input[name] = event.target.value;

            setInput(prevState => {

                return {
                    ...prevState,
                    ...input
                };

            });

        };

    };

    const onConceptCardChangeHandler = (index: number, name: string) => {

        return (event: React.ChangeEvent<HTMLInputElement>) => {

            const conceptCards: ConceptCard[] = input.conceptCards;
            conceptCards[index][name] = event.target.value;

            setInput(prevState => {
                return {
                    ...prevState,
                    conceptCards: conceptCards
                };
            });

        };

    };

    const getSchoolOptions = () => {

        const options: SchoolOptions = {
            null: "Not Applicable",
            sfu: "Simon Fraser University",
            ubc: "University of British Columbia"
        };

        const optionElements: JSX.Element[] = [];

        for (let key in options) {

            const optionElement: JSX.Element = (
                <MenuItem key={key} value={key}>
                    {options[key]}
                </MenuItem>
            );

            optionElements.push(optionElement);
        }

        return optionElements;
    };

    const addConceptCardOnClickHandler = () => {

        const emptyConceptCard: ConceptCard = {
            term: "",
            definition: ""
        };

        const conceptCards: ConceptCard[] = [...input.conceptCards];
        conceptCards.push(emptyConceptCard);

        setInput(prevState => {
            return {
                ...prevState,
                conceptCards: conceptCards
            };
        });

    };

    const getOnDeleteHandler = (index: number) => {

        return () => {

            const conceptCards: ConceptCard[] = [...input.conceptCards];
            conceptCards.splice(index, 1);

            setInput(prevState => {
                return {
                    ...prevState,
                    conceptCards: conceptCards
                };
            });

        };

    };

    const getConceptCardInputElements = () => {

        const conceptCardInputElements: JSX.Element[] = [];

        input.conceptCards.forEach((oConceptCardInput, index) => {

            const conceptCardElement = (
                <ConceptCardInputField
                    key={index}
                    index={index}
                    input={input}
                    onDeleteHandler={getOnDeleteHandler}
                    onConceptCardChangeHandler={onConceptCardChangeHandler}
                />
            );

            conceptCardInputElements.push(conceptCardElement);
        });

        return conceptCardInputElements;
    };

    const showDescriptionField = () => {

        setIsDescriptionHidden(false);

    };

    const showSchoolField = () => {

        setIsSchoolHidden(false);

    };

    const showErrorMessage = () => {

        const errorElements: JSX.Element[] = [];

        errorMessages.forEach((message, index) => {

            const errorElement = (
                <Typography
                    key={index}
                >
                    {message}
                </Typography>
            );

            errorElements.push(errorElement);
        });

        return errorElements;
    };

    const addErrorMessage = (message: string) => {

        setErrorMessages(prevState => {

            const errorMessages: string[] = [...prevState];
            errorMessages.push(message);

            return errorMessages;

        });

    };

    const clearErrorMessages = () => {

        setErrorMessages([]);

    };

    const isConceptCardValid = (card: ConceptCard): boolean => {

        let isValid: boolean = true;

        if (card.term === null || card.term === undefined || card.term.trim() === "") {
            addErrorMessage(TRANSLATED_ERROR_TEXT.CONCEPT_CARD_TERM_REQUIRED);
            isValid = false;
        }
        if (card.definition === null || card.definition === undefined || card.definition.trim() === "") {
            addErrorMessage(TRANSLATED_ERROR_TEXT.CONCEPT_CARD_DEFINITION_REQUIRED);
            isValid = false;
        }
        if (card.term.length > CARD_LENGTH_LIMIT.CONCEPT_CARD_TERM_LENGTH_LIMIT) {
            addErrorMessage(TRANSLATED_ERROR_TEXT.CONCEPT_CARD_TERM_LENGTH_LIMIT_EXCEEDED);
            isValid = false;
        }
        if (card.definition.length > CARD_LENGTH_LIMIT.CONCEPT_CARD_DEFINITION_LENGTH_LIMIT) {
            addErrorMessage(TRANSLATED_ERROR_TEXT.CONCEPT_CARD_DEFINITION_LENGTH_LIMIT_EXCEEDED);
            isValid = false;
        }

        return isValid;
    };

    const isInputValid = (): boolean => {

        let isValid: boolean = true;

        if (!input.conceptCards || input.conceptCards.length === 0) {
            addErrorMessage(TRANSLATED_ERROR_TEXT.AT_LEAST_ONE_CONCEPT_CARD);
            isValid = false;
        }

        if (input.title === null || input.title === undefined || input.title.trim() === "") {
            addErrorMessage(TRANSLATED_ERROR_TEXT.STUDY_CARD_TITLE_REQUIRED);
            isValid = false;
        }

        if (input.conceptCards && input.conceptCards.length >= 0) {

            for (let i = 0; i < input.conceptCards.length; i++) {

                const oConceptCard = input.conceptCards[i];

                if (!isConceptCardValid(oConceptCard)) {

                    isValid = false;

                }
            }

        }

        return isValid;
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
            .catch((error) => {
                setIsSubmitting(false);
                if (!error.response) {
                    addErrorMessage(TRANSLATED_ERROR_TEXT.SERVER_NO_RESPONSE);
                }
                else if (error.response.status === HTTP_RESPONSE_STATUS.INVALID_REQUEST) {
                    addErrorMessage(TRANSLATED_ERROR_TEXT.SERVER_INVALIDA_INPUT_ERROR);
                } else {
                    addErrorMessage(TRANSLATED_ERROR_TEXT.SERVER_INTERNAL_ERROR);
                }
            });
    };

    return (
        <div className="AddStudyCardPage">
            <form className={classes.form}>
                <TextField
                    id="title"
                    label="Title"
                    className={classes.textField}
                    value={input.title}
                    onChange={getOnChangeHandler("title")}
                    margin="dense"
                    inputProps={{
                        maxLength: CARD_LENGTH_LIMIT.STUDY_CARD_TITLE_LENGTH_LIMIT,
                        autoComplete: "off"
                    }}
                />
                <TextField
                    id="description"
                    label="Description"
                    className={classes.textField}
                    value={input.description}
                    onChange={getOnChangeHandler("description")}
                    margin="dense"
                    style={isDescriptionHidden ? { display: "none" } : {}}
                    inputProps={{
                        maxLength: CARD_LENGTH_LIMIT.STUDY_CARD_DESCRIPTION_LENGTH_LIMIT,
                        autoComplete: "off"
                    }}
                />
                <TextField
                    id="school"
                    select
                    label="School"
                    className={classes.textField}
                    value={input.school}
                    onChange={getOnChangeHandler("school")}
                    margin="dense"
                    style={isSchoolHidden ? { display: "none" } : {}}
                    inputProps={{
                        maxLength: CARD_LENGTH_LIMIT.STUDY_CARD_SCHOOL_LIMIT,
                        autoComplete: "off"
                    }}
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
                {getConceptCardInputElements()}
                <div className={classes.errorMessageContainer}>
                    {showErrorMessage()}
                </div>
                <div className={classes.loaderContainer}>
                    {isSubmitting ? <CircularProgress /> : null}
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
