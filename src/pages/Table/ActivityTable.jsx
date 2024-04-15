import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import {List, ListItem, ListItemText, Menu, MenuItem} from "@mui/material";
import React, {useCallback, useEffect, useRef} from "react";

const coins = ['BITCOIN', 'LITECOIN', 'DOGECOIN', 'DIGIBYTE', 'RAVENCOIN' ];

export const ActivityTable = () => {

    const [info, setInfo] = React.useState([]);
    const coin = useRef();
    const establishUserWalletInfo = useCallback(async () => {
        try {
            const response = await qortalRequestWithTimeout({
                action: 'GET_TX_ACTIVITY_SUMMARY',
                coin: coin.current
            }, 1800000)

            setInfo( response );

        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        establishUserWalletInfo()
    }, [coin])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState();
    const open = Boolean(anchorEl);

    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);

        coin.current = coins[index];
        establishUserWalletInfo();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
      <div>
        <div>
         <List
           component="nav"
            aria-label="Coins"
           sx={{ bgcolor: "background.paper"}}
           >
           <ListItem
             button
             id="lock-button"
             aria-haspopup="listbox"
             aria-controls="lock-menu"
             aria-label="derived addresses"
             aria-expanded={open ? "true" : undefined}
             onClick={handleClickListItem}
             >
              <ListItemText
                  primary="Select Coin"
                  secondary={coins[selectedIndex]}
              />
           </ListItem>
         </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'lock-button',
                role: 'listbox'
            }}
          >
              {coins.map((coin, index) => (
                  <MenuItem
                    key={coin}
                    disabled={index === selectedIndex}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                      {coin}
                  </MenuItem>
              ))}
          </Menu>
        </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
              <TableCell>AT Address</TableCell>
              <TableCell>P2SH Value</TableCell>
              <TableCell>P2SH Address</TableCell>
              <TableCell>Locking Hash</TableCell>
              <TableCell align="right">Locking Timestamp</TableCell>
              <TableCell align="right">Locking Total Amount</TableCell>
              <TableCell align="right">Locking Fee</TableCell>
              <TableCell align="right">Locking Size</TableCell>
              <TableCell>Locking Hash</TableCell>
              <TableCell align="right">Unlocking Timestamp</TableCell>
              <TableCell align="right">Unlocking Total Amount</TableCell>
              <TableCell align="right">Unlocking Fee</TableCell>
              <TableCell align="right">Unlocking Size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {info.map((row) => (
            <TableRow
              key={row.address}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell>{row.atAddress}</TableCell>
                <TableCell>{row.p2shValue}</TableCell>
                <TableCell>{row.p2shAddress}</TableCell>
                <TableCell>{row.lockingHash}</TableCell>
                <TableCell align="right">{row.lockingTimestamp}</TableCell>
                <TableCell align="right">{row.lockingTotalAmount}</TableCell>
                <TableCell align="right">{row.lockingFee}</TableCell>
                <TableCell align="right">{row.lockingSize}</TableCell>
                <TableCell>{row.unlockingHash}</TableCell>
                <TableCell align="right">{row.unlockingTimestamp}</TableCell>
                <TableCell align="right">{row.unlockingTotalAmount}</TableCell>
                <TableCell align="right">{row.unlockingFee}</TableCell>
                <TableCell align="right">{row.unlockingSize}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
  );
}
