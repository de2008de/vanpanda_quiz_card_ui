import React from "react";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
                    id="conceptCardTitle"
                    label="Title"
                    className={classes.textField}
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
                    label="Content"
                    className={classes.textField}
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
