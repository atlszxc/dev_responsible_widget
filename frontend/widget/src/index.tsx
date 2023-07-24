import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss'
import MainOptions from './locations/MainOptions';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux';
import { makeStore } from './store/store';
import DigitalPipeline from './locations/DigitalPipeline';
import { SWRConfig } from 'swr';
import { WebSocketProvider, socket } from './context/socket';

const queryClient = new QueryClient()

const Widget = {
    render() {
        return true;
    },

    init() {
        return true;
    },

    bind_actions() {
        return true;
    },

    dpSettings(work_area: string) {
        const rootElement: HTMLElement | null = document.getElementById(work_area)? document.getElementById(work_area) : null
        if(rootElement) {
            const root = ReactDOM.createRoot(rootElement)
            root.render(
                <Provider store={makeStore()}>
                    <DigitalPipeline />
                </Provider>
            )
        }
    },

    initMenuPage(work_area: string) {
        console.log('initMenuPage');
        const rootElement: HTMLElement | null = document.getElementById(work_area)? document.getElementById(work_area) : null
        console.log('rootElement', rootElement);
        if(rootElement) {
            const root = ReactDOM.createRoot(rootElement)
            root.render(
                <WebSocketProvider value={socket}>
                    <SWRConfig value={{
                        revalidateOnFocus: false,
                        refreshInterval: 60000,
                    }}>
                        <Provider store={makeStore()}>
                            <MainOptions />
                        </Provider>
                    </SWRConfig>
                </WebSocketProvider>
            )
        }
    },

    settings() {
        return true;
    },

    advancedSettings() {
        return true;
    },

    onSave() {
        return true;
    },

    destroy() {
    },

    contacts_selected() {

    },

    leads_selected() {

    },

    tasks_selected() {

    }

};

export default Widget;