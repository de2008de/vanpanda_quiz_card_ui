import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from '@material-ui/icons/Delete';
import React from "react";
import { CARD_LENGTH_LIMIT } from "../../resources/lengthLimit/CardLengthLimit";
import { palette } from "../../theme/colorPalette";

const useStyles = makeStyles(theme => ({
    conceptCardInput: {
        margin: "1rem 1rem",
        padding: "1rem",
        position: "relative",
        boxShadow: "0 5px #e0e1e2",
        backgroundColor: palette.addStudyCardPage.conceptCardInput.background,
        color: palette.addStudyCardPage.conceptCardInput.text
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        display: "flex",
        width: "auto"
    },
    deleteButton: {
        color: palette.addStudyCardPage.conceptCardInput.text
    },
    conceptCardHeader: {
        display: "flex",
        flexWrap: "wrap",
        fontFamily: "Schoolbell",
        fontSize: "1.5rem",
        fontWeight: "bold"
    }
}));

const ConceptCardInputField = props => {
    const classes = useStyles();
    return (
        <Card className={classes.conceptCardInput}>
            <div className={classes.conceptCardHeader}>
                <div>
                    Concept Card
                </div>
                <div style={{ flexGrow: "1" }}>
                </div>
                <div
                    className={classes.deleteButton}
                    onClick={props.onDeleteHandler(props.index)}
                >
                    <DeleteIcon />
                </div>
            </div>
            <Box
                component="div"
            >
                <TextField
                    required
                    label="Term"
                    className={classes.textField}
                    value={props.input.conceptCards[props.index].term}
                    onChange={props.onConceptCardChangeHandler(
                        props.index,
                        "term"
                    )}
                    margin="dense"
                    inputProps={{
                        maxLength: CARD_LENGTH_LIMIT.CONCEPT_CARD_TERM_LENGTH_LIMIT,
                        autoComplete: "off"
                    }}
                />
                <TextField
                    required
                    multiline
                    label="Definition"
                    className={classes.textField}
                    value={props.input.conceptCards[props.index].definition}
                    onChange={props.onConceptCardChangeHandler(
                        props.index,
                        "definition"
                    )}
                    margin="dense"
                    inputProps={{
                        maxLength: CARD_LENGTH_LIMIT.CONCEPT_CARD_DEFINITION_LENGTH_LIMIT,
                        autoComplete: "off"
                    }}
                />
            </Box>
        </Card>
    );
}

export default ConceptCardInputField;
