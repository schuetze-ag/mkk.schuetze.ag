FROM httpd:alpine

RUN echo 'ServerName localhost' >> /usr/local/apache2/conf/httpd.conf
RUN echo 'Header set Cache-Control "max-age=600, public"' >> /usr/local/apache2/conf/httpd.conf
ADD public/ /usr/local/apache2/htdocs/

