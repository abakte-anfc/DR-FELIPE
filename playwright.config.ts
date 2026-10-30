import { defineConfig } from '@playwright/test';
export default defineConfig({testDir:'./tests/browser',use:{baseURL:'http://127.0.0.1:5173',launchOptions:{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}},webServer:{command:'npm.cmd run dev -- --port 5173',url:'http://127.0.0.1:5173',reuseExistingServer:true},reporter:'list'});
