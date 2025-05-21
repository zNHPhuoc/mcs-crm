FROM confluentinc/cp-kafka:7.3.2

# Copy script từ thư mục build context vào container
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh

# Debug: show files in /usr/local/bin/
RUN ls -l /usr/local/bin/

# Cấp quyền thực thi
RUN chmod +x /usr/local/bin/wait-for-it.sh

# CMD mặc định (chờ zookeeper rồi mới chạy Kafka)
CMD ["/usr/local/bin/wait-for-it.sh", "zookeeper:2181", "--", "/etc/confluent/docker/run"]
