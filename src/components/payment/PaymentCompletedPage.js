import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import qs from "query-string";

const useStyles = makeStyles(theme => ({

}));

const PaymentCompletedPage = props => {
    const classes = useStyles();

    const company = qs.parse(props.location.search).company;
    const amount = qs.parse(props.location.search).amount;
    const credit = qs.parse(props.location.search).credit;
    const username = qs.parse(props.location.search).username;
    const invoiceId = qs.parse(props.location.search).invoiceId;

    return (
        <div className="PaymentCompletedPage">
            <Typography variant="h6">Purchase Success</Typography>
            <Typography variant="h6">Invoice ID: {invoiceId}</Typography>
            <Table>
                <TableBody>
                <TableRow>
                        <TableCell className={classes.field}>
                            Company
                        </TableCell>
                        <TableCell>{company}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className={classes.field}>
                            Username
                        </TableCell>
                        <TableCell>{username}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className={classes.field}>
                            amount
                        </TableCell>
                        <TableCell>${amount} CAD</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className={classes.field}>
                            Credit
                        </TableCell>
                        <TableCell>{credit}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Button variant="contained" color="primary">Print</Button>
        </div>
    );
}

export default PaymentCompletedPage;
