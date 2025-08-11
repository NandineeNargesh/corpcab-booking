'use client';

import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { SourceCoordinateContext } from '@/context/SourceCordiContext';
import { DestinationCoordinateContext } from '@/context/DestinationCordiContext';

type Props = {
  onSourceSelect: (value: string) => void;
  onDestinationSelect: (value: string) => void;
};

const AutoCompleteAddress = ({ onSourceSelect, onDestinationSelect }: Props) => {
  const [activeInput, setActiveInput] = useState<'source' | 'destination' | null>(null);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sourceList, setSourceList] = useState<any[]>([]);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [destList, setDestList] = useState<any[]>([]);

  const { setSourceCoordinates } = useContext(SourceCoordinateContext);
  const { setDestinationCoordinates } = useContext(DestinationCoordinateContext);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (source.length > 2 && activeInput === 'source') {
        fetchSuggestions(source, 'source');
      }
      if (destination.length > 2 && activeInput === 'destination') {
        fetchSuggestions(destination, 'destination');
      }
    }, 600);
    return () => clearTimeout(delay);
  }, [source, destination, activeInput]);

  const fetchSuggestions = async (query: string, type: 'source' | 'destination') => {
    const res = await axios.get(
      `https://api.maptiler.com/geocoding/${query}.json?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`
    );
    const features = res.data.features || [];
    if (type === 'source') setSourceList(features);
    if (type === 'destination') setDestList(features);
  };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSourceAddressClick = (item: any) => {
    setSource(item.place_name);
    setSourceList([]);
    setActiveInput(null);
    setSourceCoordinates(item.center);
    onSourceSelect(item.place_name);
  };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDestinationAddressClick = (item: any) => {
    setDestination(item.place_name);
    setDestList([]);
    setActiveInput(null);
    setDestinationCoordinates(item.center);
    onDestinationSelect(item.place_name);
  };

  return (
    <div className="p-5 w-full">
      {/* Source Input */}
      <div className="relative w-full mb-4">
        <span className="text-gray-800 font-semibold"> Source</span>
        <input
          type="text"
          className="bg-white p-3 border border-gray-300 w-full rounded-md outline-none focus:bg-blue-50 transition-all duration-300"
          placeholder="Where From?"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          onFocus={() => setActiveInput('source')}
          onBlur={() => setTimeout(() => setActiveInput(null), 200)}
        />
        <AnimatePresence>
          {activeInput === 'source' && sourceList.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 w-full z-10 bg-white shadow-md border border-gray-300 rounded-md max-h-60 overflow-y-auto mt-1"
            >
              {sourceList.map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 cursor-pointer"
                  onClick={() => onSourceAddressClick(item)}
                >
                  {item.place_name}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Destination Input */}
      <div className="relative w-full">
        <span className="text-gray-800 font-semibold">Destination</span>
        <input
          type="text"
          className="bg-white p-3 border border-gray-300 w-full rounded-md outline-none focus:bg-blue-50 transition-all duration-300"
          placeholder="Where To?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          onFocus={() => setActiveInput('destination')}
          onBlur={() => setTimeout(() => setActiveInput(null), 200)}
        />
        <AnimatePresence>
          {activeInput === 'destination' && destList.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 w-full z-10 bg-white shadow-md border border-gray-300 rounded-md max-h-60 overflow-y-auto mt-1"
            >
              {destList.map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 cursor-pointer"
                  onClick={() => onDestinationAddressClick(item)}
                >
                  {item.place_name}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AutoCompleteAddress;
