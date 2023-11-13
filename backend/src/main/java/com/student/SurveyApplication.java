package com.student;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.student"})
public class SurveyApplication {

	public static void main(String[] args) {
		SpringApplication.run(SurveyApplication.class, args);
	}

	@PostConstruct
	public void logLoadedClasses() {
		ClassLoader classLoader = getClass().getClassLoader();
		System.out.println("Classes loaded by " + classLoader + ":");
		logClasses(classLoader);
	}

	private void logClasses(ClassLoader classLoader) {
		if (classLoader == null) {
			return;
		}

		if (classLoader instanceof java.net.URLClassLoader) {
			java.net.URLClassLoader urlClassLoader = (java.net.URLClassLoader) classLoader;
			for (java.net.URL url : urlClassLoader.getURLs()) {
				System.out.println("  " + url.getFile());
			}
		}

		// Recursively log classes loaded by parent class loader
		logClasses(classLoader.getParent());
	}

}