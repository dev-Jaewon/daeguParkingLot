package com.smartFarmer.server.configuration;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.database.BeanPropertyItemSqlParameterSourceProvider;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.LineMapper;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.batch.item.file.mapping.DefaultLineMapper;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.transaction.PlatformTransactionManager;

import com.smartFarmer.server.model.ParkingAlot;

import javax.sql.DataSource;

@Configuration
@EnableBatchProcessing
public class BatchConfig {

    @Value("classPath:data.csv")
    private Resource inputResource;

    @Bean
    public DataSource dataSource() {

        EmbeddedDatabaseBuilder embeddedDatabaseBuilder = new EmbeddedDatabaseBuilder();

        return embeddedDatabaseBuilder.addScript("classpath:org/springframework/batch/core/schema-drop-h2.sql")
                .addScript("classpath:org/springframework/batch/core/schema-h2.sql")
                .addScript("classpath:parkingAlot.sql")
                .setType(EmbeddedDatabaseType.H2)
                .build();
    }

    @Bean
    public JdbcBatchItemWriter<ParkingAlot> writer() {

        JdbcBatchItemWriter<ParkingAlot> itemWriter = new JdbcBatchItemWriter<ParkingAlot>();

        itemWriter.setDataSource(dataSource());
        itemWriter.setSql(
                " INSERT INTO PARKINGALOT (\r\n" + //
                        "MANAGE_NUM, NAME, DIVISION, TYPE, STREET_ADDRESS, LOCATION_ADDRESS, AREA_NUM, PAPER_FEED, END_MEMBER, OPERATING_DAY, OPERATING_START_TIME, OPERATING_END_TIME, OPERATING_SAT_START_TIME, OPERATING_SAT_END_TIME, OPERATING_HOLIDAY_START_TIME, OPERATING_HOLIDAY_END_TIME, PRICE_INFORMATION, BASIC_TIME, NOMAL_PRICE, PER_TIME, PER_PRICE, DAY_PRICE_TIME, DAY_PRICE, REGULAR_PRICE, PAYMENT, OTHER_MATTERS, MANAGEMENT_AGENCY, TEL_NUMBER, LAT, LOT, THE_DISABLED, UPDATED_AT\r\n"
                        + //
                        ")VALUES(\r\n" + //
                        ":manageNum, :name, :division, :type, :streetAddress, :locationAddress, :areaNum, :paperFeed, :endMember, :operatingDay, :operatingStartTime, :operatingEndTime, :operatingSatStartTime, :operatingSatEndTime, :operatingHolidayStartTime, :operatingHolidayEndTime, :priceInformation, :basicTime, :nomalPrice, :perTime, :perPrice, :dayPriceTime, :dayPrice, :regularPrice, :payment, :otherMatters, :managementAgency, :telNumber, :lat, :lot, :theDisabled, :updatedAt\r\n"
                        + //
                        ");");
        itemWriter.setItemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider<ParkingAlot>());
        return itemWriter;
    }

    @Bean
    public LineMapper<ParkingAlot> lineMapper() {
        DefaultLineMapper<ParkingAlot> lineMapper = new DefaultLineMapper<ParkingAlot>();
        DelimitedLineTokenizer lineTokenizer = new DelimitedLineTokenizer();
        BeanWrapperFieldSetMapper<ParkingAlot> fieldSetMapper = new BeanWrapperFieldSetMapper<ParkingAlot>();

        lineTokenizer.setNames("MANAGE_NUM, NAME, DIVISION, TYPE, STREET_ADDRESS, LOCATION_ADDRESS, AREA_NUM, PAPER_FEED, END_MEMBER, OPERATING_DAY, OPERATING_START_TIME, OPERATING_END_TIME, OPERATING_SAT_START_TIME, OPERATING_SAT_END_TIME, OPERATING_HOLIDAY_START_TIME, OPERATING_HOLIDAY_END_TIME, PRICE_INFORMATION, BASIC_TIME, NOMAL_PRICE, PER_TIME, PER_PRICE, DAY_PRICE_TIME, DAY_PRICE, REGULAR_PRICE, PAYMENT, OTHER_MATTERS, MANAGEMENT_AGENCY, TEL_NUMBER, LAT, LOT, THE_DISABLED, UPDATED_AT".split(", "));
        fieldSetMapper.setTargetType(ParkingAlot.class);
        lineMapper.setLineTokenizer(lineTokenizer);
        lineMapper.setFieldSetMapper(fieldSetMapper);

        return lineMapper;
    }

    @Bean
    public Job runJob(JobRepository jobRepository, PlatformTransactionManager transactionManager) {
        return new JobBuilder("readCSVFileJob", jobRepository)
                .incrementer(new RunIdIncrementer())
                .start(step(jobRepository, transactionManager))
                .build();
    }

    /**
     * StepBuilder which sets the JobRepository and PlatformTransactionManager
     * automatically
     */

    @Bean
    public Step step(JobRepository jobRepository, PlatformTransactionManager transactionManager) {
        return new StepBuilder("csv-step", jobRepository)
                .<ParkingAlot, ParkingAlot>chunk(2, transactionManager)
                .reader(reader())
                .processor(processor())
                .writer(writer())
                .build();
    }

    /**
     * Prints the Logs in the console.
     * 
     * @return
     */

    @Bean
    public ItemProcessor<ParkingAlot, ParkingAlot> processor() {
        return new DBLogProcessor();
    }

    /**
     * FlatFileItemReader<T> Restartable ItemReader that reads lines from input
     * setResource(Resource).
     * 
     * @return
     */

    @Bean
    public FlatFileItemReader<ParkingAlot> reader() {
        FlatFileItemReader<ParkingAlot> itemReader = new FlatFileItemReader<ParkingAlot>();
        itemReader.setLineMapper(lineMapper());
        itemReader.setLinesToSkip(1);
        itemReader.setResource(inputResource);
        return itemReader;
    }
}
