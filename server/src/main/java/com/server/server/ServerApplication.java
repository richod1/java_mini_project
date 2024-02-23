package com.server.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@RestController
	class ApiController{
		@GetMapping("/api/data")
		public String getData(){
			return "Data from spring server";
		}

		@GetMapping("/api/group_members")
		public List<User> getUsers(){
			List<User> users = new ArrayList<>();
			users.add(new User(1, "John"));
			users.add(new User(2, "Alice"));
			users.add(new User(3, "Bob"));
			return users;

		}

	}

}
