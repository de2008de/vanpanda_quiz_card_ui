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

const postStudyCardApi = "/api/v1/card/studycard";

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "60%"
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
    }
}));

const AddStudyCardPage = props => {
    const classes = useStyles();
    const [input, setInput] = useState({
        title: "",
        subtitle: "",
        school: "",
        conceptCards: []
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        for (let key in oOptions) {
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

    const onSubmitHandler = () => {
        setIsSubmitting(true);
        axios
            .post(ServerConfig.api.ip + postStudyCardApi, {
                title: input.title,
                subtitle: input.subtitle,
                school: input.school,
                conceptCards: input.conceptCards
            })
            .then(() => {
                setIsSubmitting(false);
                props.history.push("/success");
            })
            .catch(() => {});
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
                    id="subtitle"
                    label="Subtitle"
                    className={classes.textField}
                    value={input.subtitle}
                    onChange={onChangeHandler("subtitle")}
                    margin="dense"
                />
                <TextField
                    id="school"
                    select
                    label="School"
                    className={classes.textField}
                    value={input.school}
                    onChange={onChangeHandler("school")}
                    margin="dense"
                >
                    {getSchoolOptions()}
                </TextField>

                {getConceptCardInputFields()}
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
