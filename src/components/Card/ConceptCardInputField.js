import React from "react";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        display: "flex",
        width: "auto"
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
    }
}));

const ConceptCardInputField = props => {
    const classes = useStyles();
    return (
        <Card className={classes.conceptCardInput}>
            <Fab
                color="secondary"
                className={classes.deleteIcon}
                onClick={props.onDeleteHandler(props.index)}
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
                    value={props.input.conceptCards[props.index].title}
                    onChange={props.onConceptCardChangeHandler(
                        props.index,
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
                    value={props.input.conceptCards[props.index].content}
                    onChange={props.onConceptCardChangeHandler(
                        props.index,
                        "content"
                    )}
                    margin="dense"
                />
            </Box>
        </Card>
    );
}

export default ConceptCardInputField;
