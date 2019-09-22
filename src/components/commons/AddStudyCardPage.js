import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200
    },
    fab: {
        margin: theme.spacing(1)
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    },
    conceptCardInput: {
        margin: "1rem 1rem",
        padding: "1rem",
        borderRadius: "1rem 0.1rem 1rem 0.3rem"
    },
    conceptCardInnerInput: {
        backgroundColor: "#F2F5FA",
        borderRadius: "inherit",
        padding: "1rem"
    }
}));

const AddStudyCardPage = () => {
    const classes = useStyles();
    const [input, setInput] = useState({
        title: "",
        subtitle: "",
        school: "",
        conceptCards: []
    });

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

    const getConceptCardInputFields = () => {
        const aConceptCardInputComponents = [];
        input.conceptCards.forEach((oConceptCardInput, index) => {
            const conceptCardComponent = (
                <Card className={classes.conceptCardInput}>
                    <Box
                        component="div"
                        className={classes.conceptCardInnerInput}
                    >
                        <TextField
                            id="conceptCardTitle"
                            label="Title"
                            className={classes.textField}
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
                            className={classes.textField}
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

    return (
        <div className="AddStudyCardPage">
            <form>
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
                    color="primary"
                    aria-label="addConceptCard"
                    className={classes.fab}
                    onClick={addConceptCardOnClickHandler}
                >
                    <AddIcon className={classes.extendedIcon} />
                    Add a Concept Card
                </Fab>
            </form>
        </div>
    );
};

export default AddStudyCardPage;
