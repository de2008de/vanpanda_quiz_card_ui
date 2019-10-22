import React from "react";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CARD_LENGTH_LIMIT } from "../../resources/lengthLimit/CardLengthLimit";

const useStyles = makeStyles(theme => ({
    conceptCardInput: {
        margin: "1rem 1rem",
        padding: "1rem",
        borderRadius: "1rem 0.1rem 1rem 0.3rem",
        position: "relative",
        border: "solid " + theme.palette.primary.light
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        display: "flex",
        width: "auto"
    },
    deleteButton: {
        color: theme.palette.secondary.main,
        textDecoration: "underline"
    },
    conceptCardHeader: {
        display: "flex",
        flexWrap: "wrap"
    }
}));

const ConceptCardInputField = props => {
    const classes = useStyles();
    return (
        <Card className={classes.conceptCardInput}>
            <div className={classes.conceptCardHeader}>
                <Typography
                    variant="overline"
                >
                    Concept Card
                </Typography>
                <div style={{ flexGrow: "1" }}>
                </div>
                <Typography
                    variant="overline"
                    className={classes.deleteButton}
                    onClick={props.onDeleteHandler(props.index)}
                >
                    delete
                </Typography>
            </div>
            <Box
                component="div"
            >
                <TextField
                    label="Term"
                    className={classes.textField}
                    value={props.input.conceptCards[props.index].term}
                    onChange={props.onConceptCardChangeHandler(
                        props.index,
                        "term"
                    )}
                    margin="dense"
                    inputProps={{maxLength: CARD_LENGTH_LIMIT.CONCEPT_CARD_TERM_LENGTH_LIMIT}}
                />
                <TextField
                    multiline
                    label="Definition"
                    className={classes.textField}
                    value={props.input.conceptCards[props.index].definition}
                    onChange={props.onConceptCardChangeHandler(
                        props.index,
                        "definition"
                    )}
                    margin="dense"
                    inputProps={{maxLength: CARD_LENGTH_LIMIT.CONCEPT_CARD_DEFINITION_LENGTH_LIMIT}}
                />
            </Box>
        </Card>
    );
}

export default ConceptCardInputField;
