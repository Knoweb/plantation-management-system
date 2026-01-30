package com.knoweb.plantation.identity.config;

import com.knoweb.plantation.identity.model.Tenant;
import com.knoweb.plantation.identity.repository.TenantRepository;
import com.knoweb.plantation.identity.model.User;
import com.knoweb.plantation.identity.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;

@Configuration
public class DataSeeder {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Bean
    CommandLineRunner initDatabase(TenantRepository repository, UserRepository userRepository) {
        return args -> {
            // Cleanup Ghost Columns from previous incorrect mappings
            try {
                jdbcTemplate.execute("ALTER TABLE tenants DROP COLUMN IF EXISTS domain");
                jdbcTemplate.execute("ALTER TABLE tenants DROP COLUMN IF EXISTS name");
                System.out.println("🧹 Ghost columns 'domain' and 'name' cleaned up.");
            } catch (Exception e) {
                System.err.println("⚠️ Warning: Could not drop columns: " + e.getMessage());
            }

            if (repository.count() == 0) {
                Tenant t1 = new Tenant();
                t1.setName("Lanka Estates");
                t1.setDomain("lanka");
                t1.setSubscriptionPlan(Tenant.SubscriptionPlan.PRO);
                t1.setStatus(Tenant.TenantStatus.ACTIVE);
                repository.save(t1);

                Tenant t2 = new Tenant();
                t2.setName("Highland Teas");
                t2.setDomain("highland");
                t2.setSubscriptionPlan(Tenant.SubscriptionPlan.ENTERPRISE);
                t2.setStatus(Tenant.TenantStatus.ACTIVE);
                repository.save(t2);

                Tenant t3 = new Tenant();
                t3.setName("Green Valley");
                t3.setDomain("greenvalley");
                t3.setSubscriptionPlan(Tenant.SubscriptionPlan.FREE);
                t3.setStatus(Tenant.TenantStatus.PENDING_APPROVAL);
                repository.save(t3);

                System.out.println("🌱 Database seeded with 3 tenants!");
            }

            // Seed Users for Lanka Estates
            Tenant lankaTenant = repository.findByDomain("lanka").orElse(null);
            if (lankaTenant != null) {
                if (userRepository.findByUsernameAndTenantId("manager", lankaTenant.getTenantId()).isEmpty()) {
                    User manager = new User(
                            lankaTenant.getTenantId(),
                            "Manager Lanka",
                            "manager",
                            "password", // Plain text for now
                            User.Role.MANAGER);
                    userRepository.save(manager);
                    System.out.println("👤 User 'manager' created for Lanka Estates.");
                }
            } else {
                System.out.println("⚠️ Lanka Estates tenant not found, skipping user seed.");
            }
        };
    }
}
