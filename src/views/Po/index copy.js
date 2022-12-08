import Button from '@mui/material/Button';
import POProvider, { usePO } from 'hooks/usePo';
import * as React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import DialogSelectItem from './DialogSelectItem';
import FormStep from './FormStep';

export default function Index() {
    return (
        <POProvider>
            <Content />
        </POProvider>
    );
}

const Content = () => {
    const { setOpenFS } = usePO();
    return (
        <MainCard>
            <Button variant="outlined" onClick={() => setOpenFS(true)}>
                Open form dialog
            </Button>
            <FormStep />
            <DialogSelectItem />
        </MainCard>
    );
};
