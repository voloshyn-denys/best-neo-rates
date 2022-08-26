import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ratesSelector } from "../../store/rates/ratesSlice";
import { fetchRates } from "../../store/rates/thunks";
import { Graph } from "../../utils/graph";

export const useGraph = () => {
    const dispatch = useDispatch();
    const { rates, nodes } = useSelector(ratesSelector);
    const graph = new Graph();

    useEffect (() => {
        dispatch(fetchRates());
    }, [dispatch]);

    nodes.forEach(({ value: vertex }) => {
        graph.addVertex(vertex);
    });
    
    rates.forEach(({ fromCurrencyCode, toCurrencyCode, exchangeRate }) => {
        graph.addEdge(fromCurrencyCode, toCurrencyCode, exchangeRate);
    });

    return graph;
};

export default useGraph;