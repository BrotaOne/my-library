"use client";

import { useState } from 'react';
import { ReactReader } from 'react-reader'
import { useCurBooksCxt } from './curBooksCxt';

const EpubReader = () => {
    const { state: { dir: fileUrl } } = useCurBooksCxt();
    
    const [location, setLocation] = useState<string | number>(0)
    return (
        <div style={{ height: '100vh' }}>
            <ReactReader
                // url="https://react-reader.metabits.no/files/alice.epub"
                url={fileUrl!}
                location={location}
                locationChanged={(epubcfi: string) => setLocation(epubcfi)}
            />
        </div>
    );
}

export default EpubReader;