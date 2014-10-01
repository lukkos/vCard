<?php
namespace Lukkos\UserBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="fos_user")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    public function __construct()
    {
        parent::__construct();
        // your own logic
    }
    
    public function toArray()
    {
        $arr = array(
            'id'          => $this->id,
            'username'        => $this->username,
            'email'     => $this->email,
            'enabled'   => $this->enabled
        );
        
        return $arr;
    }
}