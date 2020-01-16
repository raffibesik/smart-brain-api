FROM node:10.15.0

WORKDIR /usr/src/app/smart-brain-api

COPY ./ ./

RUN npm i npm@latest -g 

CMD ["/bin/bash"]