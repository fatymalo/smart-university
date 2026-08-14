package com.universite.gestion.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.universite.gestion.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

}
