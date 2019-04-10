FROM httpd:alpine

RUN echo 'ServerName localhost' >> /usr/local/apache2/conf/httpd.conf
RUN echo 'Header set Cache-Control "max-age=600, public"' >> /usr/local/apache2/conf/httpd.conf
RUN echo 'LoadModule deflate_module modules/mod_deflate.so' >> /usr/local/apache2/conf/httpd.conf
RUN echo 'AddOutputFilterByType DEFLATE text/html' >> /usr/local/apache2/conf/httpd.conf
RUN echo 'AddOutputFilterByType DEFLATE application/javascript' >> /usr/local/apache2/conf/httpd.conf
RUN echo 'AddOutputFilterByType DEFLATE image/svg' >> /usr/local/apache2/conf/httpd.conf
ADD public/ /usr/local/apache2/htdocs/
