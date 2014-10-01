<?php

namespace Lukkos\VCardBundle\Entity;

use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

/**
 * Person
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class Person
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     * @Assert\NotBlank()
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var string
     * @Assert\NotBlank()
     * @ORM\Column(name="surname", type="string", length=255)
     */
    private $surname;

    /**
     * @var \DateTime
     * @Assert\NotBlank()
     * @ORM\Column(name="date_of_birth", type="datetimetz")
     */
    private $dateOfBirth;
    
    /**
     * @var string
     * @Assert\NotBlank()
     * @ORM\Column(name="address", type="text")
     */
    private $address;
    
    /**
     * @Assert\NotBlank()
     * @ORM\ManyToOne(targetEntity="Company", inversedBy="persons")
     * @ORM\JoinColumn(name="company_id", referencedColumnName="id")
     */
    protected $company;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Person
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set surname
     *
     * @param string $surname
     * @return Person
     */
    public function setSurname($surname)
    {
        $this->surname = $surname;

        return $this;
    }

    /**
     * Get surname
     *
     * @return string 
     */
    public function getSurname()
    {
        return $this->surname;
    }

    /**
     * Set dateOfBirth
     *
     * @param \DateTime $dateOfBirth
     * @return Person
     */
    public function setDateOfBirth($dateOfBirth)
    {
        
        if(is_a($dateOfBirth, 'DateTime'))
        {
            $this->dateOfBirth = $dateOfBirth;
        }
        else 
        {
            $exp = explode('T',$dateOfBirth);
            ;
            $this->dateOfBirth = new \DateTime($exp[0].' 00:00:00');
        }
       
        return $this;
    }

    /**
     * Get dateOfBirth
     *
     * @return \DateTime 
     */
    public function getDateOfBirth()
    {
        if(is_a($this->dateOfBirth,  'DateTime'))
            return $this->dateOfBirth->format('YYYY-mm-dd');
        else {
            return $this->dateOfBirth;
        }
    }

    /**
     * Set address
     *
     * @param string $address
     * @return Person
     */
    public function setAddress($address)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Get address
     *
     * @return string 
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set company
     *
     * @param \Lukkos\VCardBundle\Entity\Company $company
     * @return Person
     */
    public function setCompany(\Lukkos\VCardBundle\Entity\Company $company = null)
    {
        $this->company = $company;

        return $this;
    }

    /**
     * Get company
     *
     * @return \Lukkos\VCardBundle\Entity\Company 
     */
    public function getCompany()
    {
        return $this->company;
    }
    
    public function toArray()
    {
        $arr = array(
            'id'          => $this->id,
            'name'        => $this->name,
            'surname'     => $this->surname,
            'date_of_birth' => $this->dateOfBirth->format('Y-m-d'),
            'address'     => $this->address,
        );
        
        if($this->getCompany())
        {
            $arr['company'] = $this->getCompany()->getId();
            $arr['companyName'] = $this->getCompany()->getName();
            $arr['companyAddress'] = $this->getCompany()->getAddress();
        }
        else 
        {
            $arr['company'] = NULL;
        }
        return $arr;
    }
}
