"use client";

import { useState, useEffect } from 'react';
import api from '@/services/api';

export interface BinancePriceData {
    [symbol: string]: {
        price: number;
        change: number;
    };
}

/**
 * A reusable hook to subscribe to Binance WebSocket for real-time 24hr ticker data.
 * @param symbols Array of symbols to subscribe to (e.g. ['BTC', 'ETH', 'SOL']).
 * @returns { prices } An object mapping symbols to their current price and 24h change %.
 */
export function useBinanceTicker(symbols: string[] = []) {
    const [prices, setPrices] = useState<BinancePriceData>({});

    useEffect(() => {
        if (symbols.length === 0) return;

        // 1. Initial hydration from server API just in case WebSocket takes a moment
        const fetchInitialPrices = async () => {
            try {
                const res = await api.get('/trade/prices');
                if (res.data && res.data.data) {
                    const formatted: BinancePriceData = {};
                    Object.keys(res.data.data).forEach(key => {
                        // Only hydrate symbols we care about
                        if (symbols.includes(key.toUpperCase())) {
                            formatted[key.toUpperCase()] = {
                                price: res.data.data[key],
                                change: 0 // API may not provide change, default to 0
                            };
                        }
                    });
                    setPrices(formatted);
                }
            } catch (error) {
                // Silently fallback
            }
        };
        fetchInitialPrices();

        // 2. Connect to Binance WebSockets for live 24hr ticker data
        const ws = new WebSocket('wss://stream.binance.com:9443/ws');

        ws.onopen = () => {
            ws.send(JSON.stringify({
                method: "SUBSCRIBE",
                params: symbols.map(s => `${s.toLowerCase()}usdt@ticker`),
                id: 1
            }));
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                // e = event type, s = symbol, c = current close price, P = price change percent
                if (data.e === '24hrTicker') {
                    const symbol = data.s.replace('USDT', '').toUpperCase();
                    if (symbols.includes(symbol)) {
                        setPrices((prev) => ({
                            ...prev,
                            [symbol]: {
                                price: parseFloat(data.c),
                                change: parseFloat(data.P)
                            }
                        }));
                    }
                }
            } catch (err) {
                console.error('WS Error:', err);
            }
        };

        return () => {
            // Unsubscribe when component unmounts
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({
                    method: "UNSUBSCRIBE",
                    params: symbols.map(s => `${s.toLowerCase()}usdt@ticker`),
                    id: 1
                }));
                ws.close();
            }
        };
    }, [JSON.stringify(symbols)]); // Re-run if symbols change

    return { prices };
}
