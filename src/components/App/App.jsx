import React, { useEffect, useState } from 'react';
import { 
  Box, Divider, Container, 
  FormControl, Select, MenuItem, 
  Typography, InputAdornment, 
  OutlinedInput, Card, Button,
  List, ListItem, ListItemText} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { MULTIPLY } from "../../constants";
import { dijkstra } from '../../utils/graph';
import './App.scss';
import { useSelector } from 'react-redux';
import { ratesSelector } from '../../store/rates/ratesSlice';
import useGraph from './useGraph';
import { generateCsv } from './utils';
import { DEFAULT_AMOUNT, CONVERT_FROM, CONVERT_TO } from './constants';

const App = () => {
  const [currencyTo, setCurrencyTo] = useState(CONVERT_TO);
  const [amountCAD, setAmount] = useState(DEFAULT_AMOUNT);
  const [totalAmount, setTotalAmount] = useState(1);
  const [country, setCountry] = useState('');
  const [path, setPath] = useState(1);

  const { nodes, loading } = useSelector(ratesSelector);
  const graph = useGraph();

  useEffect(() => {
    if (loading) return;

    const { cost: rate, path } = dijkstra(graph, CONVERT_FROM, currencyTo, MULTIPLY);
    const country = nodes.find(({ value }) => value === currencyTo)?.name;
    const totalAmount = rate * amountCAD;

    setPath(path);
    setCountry(country);
    setTotalAmount(totalAmount);
  }, [amountCAD, currencyTo, graph, nodes, loading]);

  const handleChange = (event) => {
    setCurrencyTo(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const onButtonClickHandler = () => {
    generateCsv(nodes, graph, totalAmount);
  }

  if (loading) return null;

  return (
    <Container maxWidth="sm">
      <Box sx={{ m: 10 }} />
      <Card variant="outlined" >
        <Box p={3}>
          <Typography variant="h5" component="h1">
            Get best rate with Neo Financial!
          </Typography>

          <FormControl fullWidth sx={{ m: 1 }}>
            <OutlinedInput
              id="amount"
              autoFocus={true}
              type="number"
              value={amountCAD}
              onChange={handleAmountChange}
              startAdornment={<InputAdornment position="start">{CONVERT_FROM}</InputAdornment>}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <Select
              id="currency"
              value={currencyTo}
              onChange={handleChange}
            >
              {
                nodes.map(({ value, name }) => (
                  <MenuItem 
                    key={value} 
                    disabled={value === CONVERT_FROM} 
                    value={value} >
                      { `${name} (${value})` }
                    </MenuItem>
                ))
              }
            </Select>
          </FormControl>

          <Typography variant="subtitle1" gutterBottom>
            {`${amountCAD} CAD (Canada) =`}
          </Typography>

          <Typography variant="h5" gutterBottom>
            <strong>{`${totalAmount} ${currencyTo} (${country})`}</strong>
          </Typography>

          <Box sx={{ m: 6 }} />
          <Divider>Additional Information:</Divider>
          <Box sx={{ m: 2 }} />

          <Card variant="outlined">
            <List>
                <ListItem>
                  <ListItemText>
                    Currency Code: <b>{currencyTo}</b>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    Country: <b>{country}</b>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    Amount of currency: <b>{totalAmount}</b>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    Best conversation rate: <b>{path}</b>
                  </ListItemText>
                </ListItem>
            </List>
          </Card>

          <Box sx={{ m: 2 }} />
          <Button 
            variant="contained" 
            startIcon={<DownloadIcon />} 
            onClick={onButtonClickHandler} >
            Generate all currencies CSV file
          </Button>

        </Box>
      </Card>
    </Container>
  );
}

export default App;
