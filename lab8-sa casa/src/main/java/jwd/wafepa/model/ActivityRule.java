package jwd.wafepa.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Models a physical activity.
 * 
 *
 */
@Entity
@Table(name="tblActivity")
public class ActivityRule {
	
	@Id
	@GeneratedValue
	@Column(name="id")
	private Long id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="text")
	private String text;
	
	@ManyToOne(fetch=FetchType.LAZY)
	private Activity activity;
	
	public ActivityRule() {
		super();
	}

	public ActivityRule(Long id, String name, String text) {
		super();
		this.id = id;
		this.name = name;
		this.text = text;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
	
}
