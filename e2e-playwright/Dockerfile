FROM mcr.microsoft.com/playwright:v1.47.2-focal

COPY . /e2e-playwright

WORKDIR /e2e-playwright

RUN npm install -g npm@10.9.0

RUN npm install @playwright/test

CMD [ "npx", "playwright", "test", "--reporter=list" ]